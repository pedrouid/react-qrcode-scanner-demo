import * as React from "react";
import styled from "styled-components";
import * as Webcam from "react-webcam";
import QrCode from "qrcode-reader";
import Button from "./Button";

const SQRCodeScanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class QRCodeScanner extends React.Component {
  public webcam: Webcam | null;

  public qr: any;

  public componentDidMount() {
    this.qr = new QrCode();
    this.qr.callback = (error: Error, result: any) => {
      if (error) {
        console.log(error); // tslint:disable-line
        return;
      }
      console.log("result", result); // tslint:disable-line
      console.log("result.result", result.result); // tslint:disable-line
    };
  }

  public capture = () => {
    if (this.webcam) {
      const imageSrc = this.webcam.getScreenshot();
      console.log("imageSrc", imageSrc); // tslint:disable-line
      if (imageSrc) {
        const result = this.qr.decode(imageSrc);
        console.log("result", result); // tslint:disable-line
      }
    }
  };

  public render() {
    return (
      <SQRCodeScanner>
        <Webcam
          audio={false}
          height={350}
          ref={c => (this.webcam = c)}
          screenshotFormat="image/jpeg"
          width={350}
          // videoConstraints={{
          //   width: 1280,
          //   height: 720,
          //   facingMode: "user"
          // }}
        />
        <Button onClick={this.capture}>Capture photo</Button>
      </SQRCodeScanner>
    );
  }
}

export default QRCodeScanner;
