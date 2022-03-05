import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, useTheme } from "@mui/material";

const defaultStyles = {
  transition: 'all .3s',
  display: 'flex',
  height: '100%',
  position: 'relative',
  borderRadius: '5px'
}
const activeStyles = {
  ...defaultStyles,
  border: '1px dashed blue',
  boxShadow: "0px 0px 11px 5px rgba(0,0,0,0.25)"

}

const inactiveStyles = {
  ...defaultStyles,
  border: '1px dashed black',
}

const getStyles = (active, theme) => {
  if (active) {
    return {
      ...activeStyles,
      border: `1px dashed ${theme?.palette?.primary?.main}`,
    }
  } else {
    return {
      ...inactiveStyles,
      border: `1px dashed ${theme?.palette.grey[500]}`,
    }
  }
}

const ImgUploadInput = (options) => {

  const theme = useTheme();

  const { multiple, style, accept, icon, button, className, description, change, name, previewImage, deleteButton } = options;

  const [files, setFiles] = useState([]);

  const [preview, setPreview] = useState(null)

  const [active, setActive] = useState(false);

  useEffect(() => {
    setPreview(previewImage)
  }, [previewImage])

  useEffect(() => {
    if (files.length > 0) {
      setPreview(URL.createObjectURL(files[0]));
      change?.({ target: { name: name, files: files, type: "file" } });
    }
  }, [files])

  const handleDelete = (e) => {
    setFiles([]);
    setPreview(null);
    change?.({ target: { name: name, files: null, type: "file" } });
  }

  const { getInputProps, getRootProps } = useDropzone({
    accept: accept ? accept : 'image/*',
    maxFiles: 1,
    multiple: multiple,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles
      )
    },
    onDragEnter: (event) => {
      setActive(true);
    },
    onDragLeave: (event) => {
      setActive(false);
    },
    onDropAccepted: () => {
      setActive(false);
    }
  });

  return (
    <div style={{ height: "200px", position: 'relative', margin: 'auto', maxWidth: '100%', borderRadius: 10, ...style, }} className={className} >
      {deleteButton ?
        <Button color="error" type="button" onClick={handleDelete} style={{ height: 20, width: 20, position: 'absolute', borderRadius: '100%', padding: 0, top: -7, right: -7, zIndex: 1 }}>
          X
        </Button>
        :
        null
      }
      <div
        {...getRootProps()}
        style={{ cursor: 'pointer', height: '100%' }}
      >
        <div style={getStyles(active, theme)}>
          {
            preview ?
              <img style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }} src={preview} alt="preview-image" />
              :
              <div style={{ textAlign: 'center', margin: 'auto', padding: '0 15px' }}>
                <div style={{ color: active ? theme?.palette.primary.main : theme?.palette.grey[500] }}>
                  {icon}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '16px', color: active ? theme?.palette.primary.main : theme?.palette.grey[500] }} >
                  <label>{description ? description : "Arrastre una imagen o haga click"}</label>
                </div>
              </div>
          }
        </div>
        {
          button ?
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <Button color="primary">
                {button.text}
              </Button>
            </div>
            :
            null
        }
        <input type="file" {...getInputProps()} />
      </div>
    </div >

  )
}

ImgUploadInput.propTypes = {
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  icon: PropTypes.element,
  className: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  change: PropTypes.func,
  button: PropTypes.object,
  previewImage: PropTypes.string
}

export default ImgUploadInput;
