# Text Editor POC

### This project is a proof-of-concept (POC) text editor built using React, Vite, Slate.js, and TypeScript.

## Features
- **Bold**, *Italic*, Underline, `Code`
- Headings (H1, H2)
- Bullet List, Numbered List, Check List
- Alignment of left, center, right, justify
- Link insertion
- Image Insertion by pasting the URL into the editor and dragging and dropping the image into the editor
- Embed Videos (YouTube) by pasting the URL directly into the editor
- Insert badges
- Search Text Through Editor
- > Block Quote

**Editor preview:**
![Screenshot from 2024-05-08 09-59-03](https://github.com/VatsalDave2102/react-text-editor/assets/124878757/8e8544b7-bd34-4b63-8a64-78b3f2e54e7b)

## Usage

### Installation

1. Clone the repository:
```
git clone https://github.com/react-mern/POC-rich-text-editor.git
```
2. Navigate to the project directory:
```
cd POC-rich-text-editor
```
3. Install dependencies:
```
npm install
```

### Development

Run the development server:

```bash
npm run dev
```
Open http://localhost:3000 to view the editor in your browser.

### Production

To build for production:
```bash
npm run build
```

### Live Demo
The project is hosted here: https://react-slate-text-editor.netlify.app/

## How to integrate it in your project

### Defining custom types using TypeScript

Slate.js stores content in a document model which is a nested, recursive tree, just like DOM itself. We create our custom element types rather than using predefined schemas. Have a look at `/scr/types.d.ts` to understand how to create custom element types. For example:

`/src/types.d.ts`:
```
export type ParagraphElement = {
	type: "paragraph";
	align?: TextAlign;
	children: Descendant[];
};

export type ImageELement = {
	type: "image";
	url: string;
	children: EmptyText[];
};
```

Don't forget to declare the `slate` module with your custom types, for example:

`/src/types.d.ts`:
```
declare module "slate" {
 interface CustomTypes {
  Editor: BaseEditor &
   ReactEditor & {
    nodeToDecorations?: Map<Element, Range[]>;
   };
  Element: CustomElement;
  Text: CustomText;
  Range: BaseRange & {
   [key: string]: unknown;
  };
 }
}
```

It is important to tell Slate to use our custom types for elements, text, and editor if using TypeScript.

### Entry point, defining `editor`, `renderElement`, `renderLeaf`.

The entry point of this is `/src/App.tsx` which defines:
- `editor` - a slate editor object with our custom features and react editor plugins.
- `renderElement` - a function that accepts `props`, based on it, we render the element in the editor.
- `renderLeaf` - a function that accepts `props`, used to render leaves that are inside elements.

`/src/App.tsx`:
```
const editor = useMemo(() => withCustomFeatures(withReact(createEditor())),[]);

const renderElement = useCallback((props: RenderElementProps) => {
  return <Element {...props} />;
}, []);

const renderLeaf = useCallback((props: RenderLeafProps) => {
  return <Leaf {...props} />;
}, []);
```

### Rendering `Slate` and `Editable` components to show the editor

Next, we render the `Slate` context provider in `/src/components/Editor.tsx`. `Slate` must be rendered before any editable components because it provides editor state to other components such as `Toolbar`, `Menu`, etc. A basic example will go as:

`/src/components/Editor.tsx`:
```
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const Editor = ({ editor, renderElement, renderLeaf }) => {
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf}/>
    </Slate>
  )
}
```

Provide the `initialValue` to `Slate` and the rendering functions to `Editable`.
> **Note**: Avoid passing the `key` prop in `Slate` unless you want to re-render `Slate` to change `initialValue` because of multiple editors.

### Defining custom elements

To render custom elements, we have passed `renderElement` and `renderLeaf` to the `Editable` component. But we need to define custom elements, an `image` element won't just automatically render. The `props` that are passed to these functions can be used to check which element we need to render. For example:

`/src/components/Element.tsx`
```
const Element: React.FC<RenderElementProps> = ({ attributes, children, element, }) => {
 switch (element.type) {
  case "heading-one":
   return (
    <h1 {...attributes} style={{ textAlign: element.align }}
      className="text-2xl mb-2 font-semibold"
    >
      {children}
    </h1>
   );
  case "link":
   return (
    <a {...attributes} href={element.url} className="underline text-blue-400" >
     {children}
    </a>
   );
   default:
    return <p {...attributes}>{children}</p>;
 }
};
```
This way we can render our `heading-one` and `link` elements. The props received are:
- `attributes`: Important attributes for slate, destructure it as props in custom element.
- `children`: To render `Leaf` inside `Element' as inline elements.
- `element`: To check element properties, such as `type`.

Similarly, we render `Leaf` components inside `Element`.

`/src/components/Leaf.tsx`:
```
const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
 if (leaf.bold) {
  children = <strong>{children}</strong>;
 }
 if (leaf.underline) {
  children = <u>{children}</u>;
 }
  return (
   // leaves must be inline that's why the span tag is used
   <span {...attributes}>
    {children}
   </span>
 );
};
```


### Custom plugins to override default editor behavior.

I have created a custom feature plugin to handle links, buttons, images, embeds, and checklists in `/src/lib/withCustomFeatures.ts`. Slate allows to override their default editor methods such as:

`/src/lib/withCustomFeatures.ts`:
```
const { isVoid, isInline } = editor;

editor.isVoid = (element) => ["image", "video"].includes(element.type) ? true : isVoid(element);

editor.isInline = (element: Element) => ["link", "badge"].includes(element.type) || isInline(element);
```

In the above code, the editor will return true for images and video elements when checked for a void element, and true for links and badges for inline elements. Also, you can check other examples in `/src/lib/withCustomFeatres.ts` if you'd like to work with the insertion of images, embeds, and links.

### Adding custom editor methods

To apply formatting and execute commands such as making text bold, inserting images, and inserting links. We need to define custom methods that use Slate's API `Transforms`, `Editor`, and many more.

I have defined my custom editor object in `/src/custom-editor/custom-editor.ts` which consists of methods for:
- mark: Formatting methods such as bold, italic, underline, and code.
- block: Methods to add and remove block elements such as block quotes, lists, and headings.
- link: Methods to insert, wrap, and remove links in the editor.
- image: Methods for image URL validation and insertion.
- badge: Methods to check the active state, insertion, wrap/unwrap badge elements.
- embed: Method to validate embed URL for YouTube and insert YouTube embed in the editor.

Example of mark methods:

```
export const MarkMethods = {
  // function to check is mark mode (block, italic, underline) active
  isMarkActive(editor: Editor, format: string) {
  const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },

  // function to toggle mark formatting
  toggleMark(editor: Editor, format: string) {
  // check if mark formatting is active
  const isActive = MarkMethods.isMarkActive(editor, format);

  // if active, remove it, else add it
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
    }
  },
};
```

If you want to work with any specific feature from above, feel free to copy and paste the methods found in `/src/custom-editor/` with the file name the same as the feature.

**Note**: To allow users to load images and embeds when the user pastes the link directly in the editor, you need to override the default `editor.insertData` method. Have a look at `/src/lib/withCustomFeatures.ts`.

### Add Toolbar and Toolbar buttons

To use the custom editor methods, add a `Toolbar` component as children in the `Slate` context provider. Wrap all the toolbar buttons inside `Toolbar` as done in `/src/components/Editor.tsx`. Look out for all the toolbar buttons in `/src/components/toolbar-buttons/`.

For example `/src/components/toolbar-buttons/MarkButton.tsx`:

```
const MarkButton: React.FC<MarkButtonProps> = ({ format, icon }) => {
 const editor = useSlate();
  return (
   <Tooltip message={format}>
    <Button
     active={CustomEditor.mark.isMarkActive(editor, format)}
     onMouseDown={(event: MouseEvent) => {
      event.preventDefault();
      CustomEditor.mark.toggleMark(editor, format);
     }}
    >
     <Icon>{icon}</Icon>
    </Button>
   </Tooltip>
  );
};
```
This component contains a reusable `Button` which calls the custom editor method for mark formatting and `Icon` to represent the icon of the button.

### Store content of editor

To store the content of the editor, use the `onChange` event available in the `Slate` component. An example of storing content in `localStorage`:

```
<Slate
  editor={editor}
  initialValue={initialValue}
  onChange={value => {
  const isAstChange = editor.operations.some(
    op => 'set_selection' !== op.type
  )
    if (isAstChange) {
      // Save the value to Local Storage.
      const content = JSON.stringify(value)
      localStorage.setItem('content', content)
    }
  }}
>
  <Editable />
</Slate>
```

