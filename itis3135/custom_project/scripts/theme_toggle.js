


function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const theme = stored || (systemDark ? 'dark' : 'light');

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  updateToggleIcon();
}

function toggleTheme() {
  const root  = document.documentElement;
  const isDark = root.classList.toggle('dark');  // returns new state
  const theme = isDark ? 'dark' : 'light';

  localStorage.setItem('theme', theme);
  updateToggleIcon();
}

function updateToggleIcon() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.textContent = document.documentElement.classList.contains('dark')
                    ? '☀️'
                    : '🌙';
}

document.addEventListener('DOMContentLoaded', initTheme);

window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.classList.toggle('dark', e.matches);
    updateToggleIcon();
  }
});


;(async function() {
  await new Promise(r => setTimeout(r, 10));
  updateToggleIcon();
  await new Promise(r => setTimeout(r, 50));
  updateToggleIcon();
})();
