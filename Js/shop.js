document.addEventListener('DOMContentLoaded', function () {
  const spinner = document.getElementById('spinner');
  if (spinner) {
    setTimeout(() => spinner.classList.remove('show'), 1);
  }

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.fixed-top');
    if (!navbar) return;
    const scrollTop = window.scrollY;
    const screenWidth = window.innerWidth;
    if (screenWidth < 992) {
      navbar.classList.toggle('shadow', scrollTop > 55);
    } else {
      navbar.classList.toggle('shadow', scrollTop > 55);
      navbar.style.top = scrollTop > 55 ? '-55px' : '0';
    }
  });

  const radios = document.querySelectorAll('.filter-radio');
  const searchInput = document.getElementById('searchInput');
  const items = document.querySelectorAll('.product-item');

  function filterProducts() {
    const selectedRadio = document.querySelector('.filter-radio:checked');
    const selectedCategory = selectedRadio ? selectedRadio.value.toLowerCase() : 'all';
    const searchText = searchInput ? searchInput.value.toLowerCase() : '';

    items.forEach(item => {
      const category = item.dataset.category.toLowerCase();
      const name = item.querySelector('.product-name').textContent.toLowerCase();

      const categoryMatch = selectedCategory === 'all' || selectedCategory === category;
      const searchMatch = name.includes(searchText);

      item.style.display = categoryMatch && searchMatch ? 'block' : 'none';
    });
  }

  radios.forEach(radio => radio.addEventListener('change', filterProducts));
  if (searchInput) searchInput.addEventListener('input', filterProducts);
  filterProducts();

  const itemsPerPage = 6;
  const pagination = document.querySelector('.pagination');

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      item.style.display = index >= start && index < end ? 'block' : 'none';
    });

    if (pagination) {
      pagination.querySelectorAll('.page-item').forEach(li => li.classList.remove('active'));
      const activeLi = pagination.querySelector(`.page-item[data-page="${page}"]`);
      if (activeLi) activeLi.classList.add('active');
    }
  }

  function createPagination(totalItems) {
    if (!pagination) return;
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
      const li = document.createElement('li');
      li.className = 'page-item';
      li.dataset.page = i;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener('click', e => {
        e.preventDefault();
        showPage(i);
      });
      pagination.appendChild(li);
    }
  }

  createPagination(items.length);
  showPage(1);

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
