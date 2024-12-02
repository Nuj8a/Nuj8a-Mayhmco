type highlight = {
  id: string;
  label: string;
  value: string;
  type?: 'file' | 'folder';
  children?: highlight[];
  parentId?: null | undefined | Number | String;
  isActive?: Boolean;
  position?: Number;
};
export const mapCategories = (categories: any[]): highlight[] => {
  const highlightMap: Record<number, highlight> = {};
  const result: highlight[] = [];

  categories
    .sort((a, b) => Number(a.position) - Number(b.position))
    .forEach((highlight) => {
      if (!highlightMap[highlight.id]) {
        highlightMap[highlight.id] = {
          id: highlight.id.toString(),
          label: highlight.name,
          value: highlight.name,
          type: 'file',
          children: [],
          parentId: highlight.parentId,
          isActive: highlight.isActive,
          position: highlight.position
        };
      }

      const currenthighlight = highlightMap[highlight.id];

      if (highlight.parentId) {
        if (!highlightMap[highlight.parentId]) {
          highlightMap[highlight.parentId] = {
            id: highlight.parentId.toString(),
            label: '',
            value: '',
            type: 'folder',
            children: [],
            parentId: highlight.parentId,
            isActive: highlight.isActive,
            position: highlight.position
          };
        }

        highlightMap[highlight.parentId].children?.push(currenthighlight);
        highlightMap[highlight.parentId].type = 'folder';
      } else {
        result.push(currenthighlight);
      }

      currenthighlight.label = highlight.name;
      currenthighlight.value = highlight.name;
    });

  return result;
};
