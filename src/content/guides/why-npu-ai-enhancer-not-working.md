---
title: "Why AI Enhancer may be unavailable"
description: "Why AI Enhancer may be unavailable on your phone: neural chip requirements, supported processors, Motorola firmware locks and USB DAC setup."
publishDate: "2026-10-15"
author: "Bitperfect Audio Team"
category: "hardware"
tags: ["npu", "ai-enhancer", "hardware", "dsp"]
draft: false
---

## How AI Enhancer operates

AI Enhancer uses a neural network to restore high frequencies. It processes music as it plays. The result is an estimate, not the original master.

The feature is off by default. It changes nothing until you turn it on. While active, the badge says Enhanced instead of Bit-perfect.

Review these four areas if AI Enhancer is unavailable or turns off.

### 1. Processor and neural chip requirements

AI Enhancer is designed for a dedicated neural chip (NPU). Phones with a supported Snapdragon or Dimensity neural chip run the full model. Other phones run Lite mode on the main processor.

- **Supported neural chips:** Snapdragon 7 Gen 1 through 8 Elite Gen 5, and Dimensity 7300 through 9400.
- **Lite mode on main processor:** Runs on the main processor when your phone lacks a supported neural chip.
- **Thermal and load throttling:** If the system is under heavy background load, processing pauses rather than introducing stutter or dropouts into the audio stream.

### 2. Audio sample rate limits

AI Enhancer operates specifically on 44.1 kHz and 48 kHz PCM files. It does not run on DSD tracks, network casting streams, or when Bit-perfect lock is active.

### 3. Bit-perfect lock interaction

When Bit-perfect lock is engaged, all digital signal processing and sound modification modules—including the AI Enhancer—are hard bypassed to guarantee exact bit reproduction to your DAC.
