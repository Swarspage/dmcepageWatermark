"use client";

// Web Audio API Sound Synthesizer for zero-bundle-weight haptic feedback

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;

    // Pitch envelope: fast drop from 380Hz to 80Hz
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

    // Volume envelope: quick attack and decay
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {
    // Ignore audio errors if browser blocks autoplay or unsupported
  }
}

export function playStampSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Mechanical Thud / Punch (Low Triangle Wave)
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = "triangle";
    thudOsc.frequency.setValueAtTime(140, now);
    thudOsc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

    thudGain.gain.setValueAtTime(0.35, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start(now);
    thudOsc.stop(now + 0.18);

    // 2. Crisp Metallic Click (High Sine sweep)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "sine";
    clickOsc.frequency.setValueAtTime(1800, now);
    clickOsc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

    clickGain.gain.setValueAtTime(0.12, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.08);

    // 3. Futuristic Seal Chime (Indigo Resonance)
    setTimeout(() => {
      try {
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        const chimeNow = ctx.currentTime;

        chimeOsc.type = "sine";
        chimeOsc.frequency.setValueAtTime(587.33, chimeNow); // D5 note matching #5E6AD2 vibe
        chimeOsc.frequency.exponentialRampToValueAtTime(880, chimeNow + 0.22); // A5

        chimeGain.gain.setValueAtTime(0.08, chimeNow);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, chimeNow + 0.22);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chimeOsc.start(chimeNow);
        chimeOsc.stop(chimeNow + 0.22);
      } catch (e) {}
    }, 60);
  } catch (e) {
    // Ignore audio errors
  }
}
