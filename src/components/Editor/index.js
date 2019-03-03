import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles, IconButton } from '@material-ui/core';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import createImagePlugin from 'draft-js-image-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import ImageIcon from '@material-ui/icons/Image';
import styles from './styles';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;


const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });

class MyEditor extends React.PureComponent {
  state = { editorState: EditorState.createEmpty() };
  handleOnChange = editorState => this.setState({ editorState });
  focus = () => {
    this.editor.focus();
  };
  handleImageSelect = ({ target: { files } }) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = ({ target: { result } }) => {
      const editorState = this.addImage(this.state.editorState, result, {});
      this.handleOnChange(editorState);
    };
  }

  addImage = (editorState, url) => {
    const urlType = 'IMAGE';
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', { styles: { width: '100%' }, src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' ',
    );
    return EditorState.forceSelection(
      newEditorState,
      newEditorState.getCurrentContent().getSelectionAfter(),
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Editor
          onClick={this.focus}
          editorState={this.state.editorState}
          plugins={[imagePlugin, inlineToolbarPlugin, resizeablePlugin,
            blockDndPlugin,
            focusPlugin,
            alignmentPlugin,
            resizeablePlugin,
            imagePlugin]}
          onChange={this.handleOnChange}
          ref={(element) => { this.editor = element; }}
          placeholder="Tell about this amazing thing..."
        />
        <InlineToolbar />
        <AlignmentTool />
        <IconButton
          style={{ alignSelf: 'end' }}
          onClick={this.handleAddClick}
          color="primary"
          type="file"
          component="label"
        >
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={this.handleImageSelect} />
          <ImageIcon />
        </IconButton>
      </div>
    );
  }
}

MyEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(MyEditor);
