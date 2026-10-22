#!/usr/bin/env python3
import os
import sys
import subprocess
import glob
import shutil

OUT_DIR = os.path.abspath("design/generated-plates")
os.makedirs(OUT_DIR, exist_ok=True)

PROMPTS = [
    {
        "name": "pricing-backdrop-raw.png",
        "title": "Pricing Section Backdrop",
        "task": """# Task: Generate Pricing Section Atmospheric Backdrop
Use your built-in `image_gen` tool (imagegen skill) to generate ONE image:
Orientation: Landscape 16:9, widest supported resolution.

DESCRIPTION:
Cinematic low-key background photograph for a high-end audiophile audio player. A vast seamless dark neutral graphite metal surface (#191919 and #1c1b21) filling the frame. In the lower third, a very broad, gentle pool of warm 2200K amber light (#ffb347) softly rakes across the surface like light cast from a recessed vacuum tube amplifier stage beneath. In the far right background, the softly blurred silhouette of a precision knurled dark titanium stepped attenuator dial catches a thin hairline specular reflection of warm champagne gold (#e8b84b). The center and upper regions remain completely clean, calm, and uncluttered dark graphite. Pure architectural restraint, Hasselblad medium format, f/4, fine film grain, zero digital noise.

Do not include: text, numbers, words, letters, logos, watermark, bright spotlight, harsh flares, pure black #000000, crushed shadows, neon, cyan, blue, purple, magenta, 3D render, CGI, glossy plastic, people, hands, cables tangling

Save the generated image exactly as generated to pricing-backdrop-raw.png in this directory.
"""
    },
    {
        "name": "band-walnut-diffuser-raw.png",
        "title": "Quadratic Walnut Acoustic Diffuser Band",
        "task": """# Task: Generate Walnut Acoustic Diffuser Band
Use your built-in `image_gen` tool (imagegen skill) to generate ONE image:
Orientation: Landscape 16:9, widest supported resolution.

DESCRIPTION:
Ultra-wide architectural macro photograph of a custom quadratic residue acoustic diffuser (QRD) crafted from solid dark American walnut. Columns of varying staggered depths run across the frame, their natural open-pore wood grain rendered in warm espresso and rich chocolate tones. A soft warm grazing light sweeps horizontally across the top edges, casting gentle geometric shadows into the wells. The floor of the shadows remains open in neutral dark graphite (#1f1e24). Ultra-wide panoramic framing, Leica S-system, architectural studio photography, tactile wood craftsmanship, subtle natural grain.

Do not include: text, watermark, logo, bright colored lights, neon, yellow varnish, glossy polyurethane, CGI render, tiling artifacts, repetition glitches, seams, plastic, floating elements, people, hands

Save the generated image exactly as generated to band-walnut-diffuser-raw.png in this directory.
"""
    },
    {
        "name": "band-vacuum-filament-raw.png",
        "title": "Warm Vacuum Tube Filament Horizon",
        "task": """# Task: Generate Vacuum Tube Filament Horizon Band
Use your built-in `image_gen` tool (imagegen skill) to generate ONE image:
Orientation: Landscape 16:9, widest supported resolution.

DESCRIPTION:
Ultra-wide panoramic low-key photograph focused on a horizontal row of glowing 300B audio vacuum tube filaments in a dark listening room. Inside clear cylindrical glass envelopes, delicate coiled tungsten filaments burn with a warm 2200K smoldering amber-gold incandescence (#ffb347 and #e8b84b), casting soft warm optical halos onto dark anodized bead-blasted graphite chassis metal below. The upper and peripheral areas dissolve into clean, noise-free neutral dark graphite (#1c1b21). Low-key cinematic lighting, authentic tube physics, Hasselblad 90mm macro, organic warmth, f/2.8.

Do not include: sci-fi glow, blue plasma, sparks, electrical arcs, neon, text, watermark, blown-out white hotspot, plastic CGI, distortion, oversaturated red, people, hands

Save the generated image exactly as generated to band-vacuum-filament-raw.png in this directory.
"""
    }
]

for item in PROMPTS:
    name = item["name"]
    title = item["title"]
    target_path = os.path.join(OUT_DIR, name)
    if os.path.exists(target_path) and os.path.getsize(target_path) > 10000:
        print(f"Skipping {name}, already exists ({os.path.getsize(target_path)} bytes).")
        continue

    print(f"\n==========================================")
    print(f"Generating {title} -> {name}")
    print(f"==========================================")

    task_file = os.path.join(OUT_DIR, "TASK.md")
    with open(task_file, "w") as f:
        f.write(item["task"])

    cmd = [
        "codex", "exec",
        "--cd", OUT_DIR,
        "--dangerously-bypass-approvals-and-sandbox",
        "Read TASK.md in the current directory and carry it out exactly."
    ]

    try:
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=240)
        print("Codex exit code:", res.returncode)
        if res.returncode != 0:
            print("STDERR snippet:", res.stderr[-500:] if res.stderr else "")
            print("STDOUT snippet:", res.stdout[-500:] if res.stdout else "")
    except subprocess.TimeoutExpired:
        print(f"Timeout generating {name}")
        continue

    # Verify if file was created or if it was placed in ~/.codex/generated_images
    if os.path.exists(target_path):
        print(f"SUCCESS: {name} found at target, size: {os.path.getsize(target_path)} bytes")
    else:
        # Search ~/.codex/generated_images for latest file
        user_home = os.path.expanduser("~")
        codex_images = glob.glob(os.path.join(user_home, ".codex/generated_images/*/*.png"))
        if codex_images:
            latest_img = max(codex_images, key=os.path.getmtime)
            print(f"Found latest codex image: {latest_img}")
            shutil.copy(latest_img, target_path)
            print(f"Copied to {target_path}, size: {os.path.getsize(target_path)} bytes")

print("\nGeneration process completed!")
