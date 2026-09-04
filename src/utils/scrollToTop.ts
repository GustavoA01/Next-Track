export const scrollToTop = () => {
  const header = document.getElementById('playlist-header');
  if (header) header.scrollIntoView({ behavior: 'smooth' });
};
