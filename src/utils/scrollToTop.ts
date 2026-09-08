export const scrollToTop = (id: string = 'header') => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};
