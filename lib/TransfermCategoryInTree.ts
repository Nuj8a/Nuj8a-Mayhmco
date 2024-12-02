type Category = {
  id: string;
  label: string;
  type?: 'file' | 'folder';
  children?: Category[];
};

export function TransfermCategoryInTree(data: any[]): Category[] {
  // Convert the fetched flat data into the required tree structure
  const categoriesMap: Record<string, Category> = {};
  const root: Category = {
    id: 'root',
    label: 'Root',
    type: 'folder',
    children: []
  };

  data.forEach((item) => {
    const category: Category = {
      id: item.id.toString(),
      label: item.name,
      type: item.parentId ? 'file' : 'folder',
      children: []
    };
    categoriesMap[category.id] = category;

    if (item.parentId) {
      // Add the category as a child of its parent
      categoriesMap[item.parentId]?.children?.push(category);
    } else {
      // Top-level category
      root.children?.push(category);
    }
  });

  return [root];
}
