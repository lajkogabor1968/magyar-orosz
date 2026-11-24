"""Recreate missing A1 MP3 files with local Piper models and ffmpeg."""
import argparse
import json
import re
import subprocess
import tempfile
from pathlib import Path

from piper import PiperVoice, SynthesisConfig


ROOT = Path(__file__).resolve().parents[1]
BERTA_READINGS = {
    "nyelvek", "jegyek", "testver", "munkahely", "leiras", "birtoklas",
    "tanterem", "cselekves", "etterem", "piac",
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("model_dir", type=Path, help="Directory with the Imre and Berta medium ONNX models and their .onnx.json files")
    args = parser.parse_args()
    source = (ROOT / "audio/a1-piper.js").read_text(encoding="utf-8")
    phrases = json.loads(source.split("window.TanuloA1Audio = ", 1)[1].strip().removesuffix(";"))
    voices = {}
    for phrase, relative_path in phrases.items():
        target = ROOT / relative_path
        if target.exists():
            continue
        target.parent.mkdir(exist_ok=True, parents=True)
        name = "berta" if target.parent.name == "a1-listening" and target.stem in BERTA_READINGS else "imre"
        if name not in voices:
            voices[name] = PiperVoice.load(args.model_dir / f"hu_HU-{name}-medium.onnx")
        voice = voices[name]
        spoken = re.sub(r"\b18\b", "tizennyolc", re.sub(r"\b20\b", "húsz", phrase))
        chunks = voice.synthesize(spoken, syn_config=SynthesisConfig(length_scale=1.06))
        pcm = bytes(7000).join(chunk.audio_int16_bytes for chunk in chunks)
        if not pcm:
            raise ValueError(f"Empty audio for {phrase}")
        with tempfile.NamedTemporaryFile(dir=target.parent, suffix=".mp3", delete=False) as temp:
            pending = Path(temp.name)
        try:
            subprocess.run([
                "ffmpeg", "-v", "error", "-f", "s16le", "-ar", str(voice.config.sample_rate),
                "-ac", "1", "-i", "pipe:0", "-codec:a", "libmp3lame", "-b:a", "48k",
                "-y", str(pending)
            ], input=pcm, check=True)
            pending.replace(target)
        finally:
            pending.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
