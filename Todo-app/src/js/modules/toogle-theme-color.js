function toggleIconTheme(iconThemeTag) {
  const imgButton = iconThemeTag.getAttribute('src');
  if (imgButton.includes('dark')) iconThemeTag.setAttribute('src', imgButton.replace('dark', 'light'));
  else if (imgButton.includes('light')) iconThemeTag.setAttribute('src', imgButton.replace('light', 'dark'));
}

function removeTheThemeClassOfBody() {
  document.body.classList.remove('light');
  document.body.classList.remove('dark');
}

function putTheThemeClassOnBody() {
  document.body.classList.add(localStorage.theme);
}

function toggleThemeInBody() {
  removeTheThemeClassOfBody();
  putTheThemeClassOnBody();
}

function initialTheme(iconThemeTag) {
  localStorage.theme = localStorage.theme || 'light';
  toggleIconTheme(iconThemeTag);
  toggleThemeInBody();
}

function isTheCorrectTheme(iconThemeTag) {
  const imgButton = iconThemeTag.getAttribute('src');
  if (imgButton.includes('light')) return localStorage.theme === 'light';
  return localStorage.theme === 'dark';
}

function toggleIconThemeIfNotCorrect(iconThemeTag) {
  if (!isTheCorrectTheme(iconThemeTag)) toggleIconTheme(iconThemeTag);
}

function toggleLocalStorageTheme() {
  const possibleChoices = {
    light: 'dark',
    dark: 'light',
  };
  localStorage.theme = possibleChoices[localStorage.theme];
}

function toggleTheme(iconThemeTag) {
  toggleLocalStorageTheme();
  toggleIconTheme(iconThemeTag);
  toggleThemeInBody();
}

export default function themeChanger(iconThemeTag) {
  initialTheme(iconThemeTag);
  toggleIconThemeIfNotCorrect(iconThemeTag);

  window.addEventListener('click', (e) => {
    const { target } = e;
    if (target.getAttribute('data-js')) {
      toggleTheme(iconThemeTag);
    }
  });
}
