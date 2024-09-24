// 'use-client';

// type SideBarProps = {
//   selectedCategories: string[];
//   setSelectedCategories: (categories: string[]) => void;
// };

// const categories = ['エンジニア', 'デザイン', 'マーケティング', '人事', '財務・経理', '医療・介護'];

// export default function SideBar({ selectedCategories, setSelectedCategories }: SideBarProps) {
//     // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//     // const[fiteredJobs, setFilteredJobs] = useState(jobs);

//     // useEffect(() => {
//     //   if (selectedCategories.length === 0) {
//     //     setFilteredJobs(jobs);
//     //   } else {
//     //     setFilteredJobs(
//     //       jobs.filter((job) => selectedCategories.includes(job.category))
//     //     );
//     //   }
//     // }, [selectedCategories]);

//     //チェックボックスの変更を管理
//     const handleCheckboxChange = (category: string) => {
//         setSelectedCategories(prev =>
//           prev.includes(category)
//             ? prev.filter(c => c !== category)
//             : [...prev, category]
//         );
//       };
    
//       return (
//         <aside className="bg-gray-100 p-4 w-1/4 h-screen">
//           <h2 className="font-bold">カテゴリフィルター</h2>
//           <div>
//             {['エンジニア', 'デザイン', 'マーケティング', '人事', '財務・経理', '医療・介護'].map(category => (
//               <label key={category} className="block">
//                 <input
//                   type="checkbox"
//                   checked={selectedCategories.includes(category)}
//                   onChange={() => handleCheckboxChange(category)}
//                 />
//                 {category}
//               </label>
//             ))}
//           </div>
//         </aside>
//       );
// };
import React, { useState } from 'react';

type SidebarProps = {
  onFilterChange: (category: string[], salary: number) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
   
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState(0);

  const categories = ['エンジニア', 'デザイン', 'マーケティング', '人事', '財務・経理', '医療・介護'];  

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    if (e.target.checked) {
      setSelectedCategory((prevCategories) => [...prevCategories, category]);
    } else {
      setSelectedCategory((prevCategories) =>
        prevCategories.filter((c) => c !== category)
      );
    }

    onFilterChange(
      e.target.checked
        ? [...selectedCategory, category] // チェックが入っている場合は新しいカテゴリを追加
        : selectedCategory.filter((c) => c !== category), // チェックが外れている場合はカテゴリを除外
      selectedSalary
    );
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const salary = parseInt(e.target.value, 10);
    setSelectedSalary(salary);
    onFilterChange(selectedCategory, salary);
  };

  return (
    <div className="p-1 bg-gray-200">
      <aside className="w-full p-4">
        <h2 className="font-bold mb-4">求人カテゴリ</h2>
        {categories.map((category) => (
          <label key={category} className="block mb-2">
            <input
              type="checkbox"
              value={category}
              onChange={handleCategoryChange}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </aside>
      <h2 className="text-xl font-bold mb-4">年収</h2>
      <select value={selectedSalary} onChange={handleSalaryChange} className="w-full p-2 border">
        <option value={0}>全ての年収</option>
        <option value={300}>300万円以上</option>
        <option value={500}>500万円以上</option>
        <option value={700}>700万円以上</option>
      </select>
    </div>
  );
};

export default Sidebar;
