const select = document.getElementById('companyId');
const input = document.getElementById('companyName');

select.addEventListener('change', (e) => {
  const selectedOption = e.target.options[e.target.selectedIndex];
 const companyName = selectedOption.getAttribute('data-name') || '';
  input.value = companyName;
});
