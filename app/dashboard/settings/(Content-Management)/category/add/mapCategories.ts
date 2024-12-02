type Category = {
  id: string;
  label: string;
  value: string;
  type?: 'file' | 'folder';
  children?: Category[];
  parentId?: null | undefined | Number | String;
  isActive?: Boolean;
  position?: Number;
};
export const mapCategories = (categories: any[]): Category[] => {
  const categoryMap: Record<number, Category> = {};
  const result: Category[] = [];

  categories
    .sort((a, b) => Number(a.position) - Number(b.position))
    .forEach((category) => {
      if (!categoryMap[category.id]) {
        categoryMap[category.id] = {
          id: category.id.toString(),
          label: category.name,
          value: category.name,
          type: 'file',
          children: [],
          parentId: category.parentId,
          isActive: category.isActive,
          position: category.position
        };
      }

      const currentCategory = categoryMap[category.id];

      if (category.parentId) {
        if (!categoryMap[category.parentId]) {
          categoryMap[category.parentId] = {
            id: category.parentId.toString(),
            label: '',
            value: '',
            type: 'folder',
            children: [],
            parentId: category.parentId,
            isActive: category.isActive,
            position: category.position
          };
        }

        categoryMap[category.parentId].children?.push(currentCategory);
        categoryMap[category.parentId].type = 'folder';
      } else {
        result.push(currentCategory);
      }

      currentCategory.label = category.name;
      currentCategory.value = category.name;
    });

  return result;
};
