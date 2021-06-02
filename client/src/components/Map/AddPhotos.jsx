import React from 'react';
import uploadFiles from './helpers/uploadFiles.js';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class AddPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      videos: [],
    }
    this.data = new FormData()
    this.handlePhotos = this.handlePhotos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePhotos (e) {
    e.preventDefault();
    const imgCont = document.getElementById('thumbnail');
    const img = document.createElement('img');
    for (let i = 0; i < e.target.files.length; i += 1) {
      img.src = URL.createObjectURL(e.target.files[i]);
      img.className = 'thumbnail';
      imgCont.appendChild(img);
      this.data.append('spotPhotos', e.target.files[i])
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    uploadFiles(this.data, this.props.spotId).then(res => console.log(res))
  }

  render () {
    return (
      <div>
          <form
            method="post"
            onSubmit={this.handleSubmit}
            encType="multipart/form-data">
            <input
              multiple
              accept="image/*"
              style={{display: 'none'}}
              type="file"
              name="spotPhotos"
              onChange={this.handlePhotos}
              ref={fileInput => this.fileInput = fileInput}/>
              <button
                type="button"
                onClick={() => this.fileInput.click()}>Upload Photo</button>
            <input type="submit"/>
          </form>
          <div id="thumbnail" className="thumbnail">

          </div>
      </div>
    )
  }
}

export default AddPhotos;