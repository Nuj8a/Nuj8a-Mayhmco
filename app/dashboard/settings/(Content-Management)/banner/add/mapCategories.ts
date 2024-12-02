type banner = {
  id: string;
  label: string;
  value: string;
  type?: 'file' | 'folder';
  children?: banner[];
  parentId?: null | undefined | Number | String;
  isActive?: Boolean;
  position?: Number;
};
export const mapCategories = (categories: any[]): banner[] => {
  const bannerMap: Record<number, banner> = {};
  const result: banner[] = [];

  categories
    .sort((a, b) => Number(a.position) - Number(b.position))
    .forEach((banner) => {
      if (!bannerMap[banner.id]) {
        bannerMap[banner.id] = {
          id: banner.id.toString(),
          label: banner.name,
          value: banner.name,
          type: 'file',
          children: [],
          parentId: banner.parentId,
          isActive: banner.isActive,
          position: banner.position
        };
      }

      const currentbanner = bannerMap[banner.id];

      if (banner.parentId) {
        if (!bannerMap[banner.parentId]) {
          bannerMap[banner.parentId] = {
            id: banner.parentId.toString(),
            label: '',
            value: '',
            type: 'folder',
            children: [],
            parentId: banner.parentId,
            isActive: banner.isActive,
            position: banner.position
          };
        }

        bannerMap[banner.parentId].children?.push(currentbanner);
        bannerMap[banner.parentId].type = 'folder';
      } else {
        result.push(currentbanner);
      }

      currentbanner.label = banner.name;
      currentbanner.value = banner.name;
    });

  return result;
};
