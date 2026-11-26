(function () {
  try {
    var saved = localStorage.getItem('picross:theme');
    var dark =
      saved === 'dark' || (saved !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch (_) {}
})();
