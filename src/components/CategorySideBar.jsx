// import React from 'react';
// import { getCategories } from '../services/api';

// class CategorySideBar extends React.Component {
//   state = {
//     categories: [],
//   };

//   componentDidMount() {
//     this.loadCategories();
//   }

//   loadCategories = async () => {
//     const categoriesLoaded = await getCategories();
//     this.setState({
//       categories: categoriesLoaded,
//     });
//   };

//   render() {
//     const { categories } = this.state;
//     return (
//       <nav>
//         {categories.map((category, index) => (
//           <label key={ index } data-testid="category" htmlFor={ category.id }>
//             <input
//               type="radio"
//               name={ category.name }
//               value={ category.name }
//               id={ category.id }
//             />
//             {category.name}
//           </label>
//         ))}
//       </nav>
//     );
//   }
// }

// export default CategorySideBar;
