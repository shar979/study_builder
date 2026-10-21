import confetti from 'canvas-confetti';

export function burstConfetti(): void {
  const count = 80;
  const defaults = { spread: 360, ticks: 60, gravity: 0.7, decay: 0.94, startVelocity: 30 };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: count,
      origin: { x: 0.5, y: 0.3 },
      colors: ['#2f87f5', '#10b981', '#f59e0b', '#f87171', '#ffffff'],
    });
  }

  shoot();
  setTimeout(shoot, 180);
  setTimeout(shoot, 360);
}

export function smallConfetti(): void {
  confetti({
    particleCount: 30,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#10b981', '#34d399', '#2f87f5'],
    ticks: 50,
  });
}

export function masteryConfetti(): void {
  const colors = ['#2f87f5', '#10b981', '#f59e0b'];
  const end = Date.now() + 900;
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
