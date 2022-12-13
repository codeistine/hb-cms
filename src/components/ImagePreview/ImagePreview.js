import React, { Component } from "react";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export class ImagePreview extends Component {
  state = {
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    profileRender: localStorage.getItem("profileImg64"),
    imageSizeCheck: false,
  };

  imageHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileRender: reader.result });
      }
    };

    if (e.target.files[0].size < 1e6) {
      reader.readAsDataURL(e.target.files[0]);

      getBase64(e.target.files[0]).then((data) => this.profileImg64(data));
      this.setState({ imageSizeCheck: "" });
    } else {
      this.setState({
        imageSizeCheck: true && (
          <p style={{ color: "red", textAlign: "center" }}>
            Image should be less than 1MB
          </p>
        ),
      });
    }
  };

  componentDidUpdate() {
    this.setState.profileRender = localStorage.getItem("profileImg64");
  }

  profileImg64(data) {
    localStorage.setItem("profileImg64", data); //save base64
  }

  checkProfileImg64() {
    return localStorage.getItem("profileImg64") ? true : false;
  }

  render() {
    const { profileImg, profileRender, imageSizeCheck } = this.state;

    return (
      <div className="ImagePreview">
        <div className="container">
          <div className="img-holder">
            <img
              src={profileRender ? profileRender : profileImg}
              alt=""
              id="img"
              className="img"
            />
          </div>

          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/tiff, image/bimp"
            name="image-upload"
            id="input"
            onChange={this.imageHandler}
          />
          
          <div className="label">
            <label className="image-upload" htmlFor="input">

              Upload Photo
            </label>
          </div>
          <div>{imageSizeCheck}</div>
        </div>
      </div>
    );
  }
}

export default ImagePreview;
