export const scrollToTop = () => {
  const header = document.getElementById('header');
  if (header) header.scrollIntoView({ behavior: 'smooth' });
};
