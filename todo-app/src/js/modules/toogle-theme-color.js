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

function initialTheme() {
  localStorage.theme = localStorage.theme || 'light';
  toggleThemeInBody();
}

function toggleLocalStorageTheme() {
  const possibleChoices = {
    light: 'dark',
    dark: 'light',
  };
  localStorage.theme = possibleChoices[localStorage.theme];
}

export function changeInitialTheme(iconThemeTag) {
  initialTheme(iconThemeTag);
}

export function toggleTheme() {
  toggleLocalStorageTheme();
  toggleThemeInBody();
}
