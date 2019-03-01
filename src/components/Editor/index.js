import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { EditorState, RichUtils } from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createImagePlugin from 'draft-js-image-plugin';
// import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import styles from './styles';

const inlineToolbarPlugin = createInlineToolbarPlugin();

class MyEditor extends React.PureComponent {
  state = { editorState: EditorState.createEmpty() };
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  handleOnChange = editorState => this.setState({ editorState });
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editor}>
        <Editor
          editorState={this.state.editorState}
          // handleKeyCommand={this.handleKeyCommand}
          plugins={[inlineToolbarPlugin, createImagePlugin]}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

MyEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(MyEditor);
