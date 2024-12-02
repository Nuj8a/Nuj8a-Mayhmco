declare module 'react-quill' {
  import { Component } from 'react';

  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    onChange?: (
      content: string,
      delta: any,
      source: string,
      editor: any
    ) => void;
    onFocus?: (range: any, source: string, editor: any) => void;
    onBlur?: (previousRange: any, source: string, editor: any) => void;
    placeholder?: string;
    theme?: string;
    modules?: Record<string, any>;
    formats?: string[];
    bounds?: string | HTMLElement;
    readOnly?: boolean;
    scrollingContainer?: string | HTMLElement;
    preserveWhitespace?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }

  class ReactQuill extends Component<ReactQuillProps> {}
  export default ReactQuill;
}
