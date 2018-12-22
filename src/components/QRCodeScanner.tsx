import * as React from "react";
import * as Webcam from "react-webcam";
import QrCode from "qrcode-reader";
import { isMobile } from "../utilities";

interface IQRCodeScannerState {
  mobile: boolean;
  interval: number | null;
}

interface IQRCodeScannerProps {
  onScan: any;
  onValidate: any;
  onClose: any;
}

class QRCodeScanner extends React.Component<IQRCodeScannerProps> {
  public state: IQRCodeScannerState;
  public webcam: any;
  public intervalId: any;
  public qr: any;

  constructor(props: IQRCodeScannerProps) {
    super(props);
    this.state = {
      mobile: isMobile(),
      interval: 250
    };
  }

  public componentDidMount() {
    this.qr = new QrCode();
    this.qr.callback = (error: Error, response: any) => {
      if (error) {
        return;
      }
      const result = response.result;
      const valid = this.props.onValidate(result);
      if (valid) {
        this.props.onScan(result);
      }
    };
    this.startInterval();
  }

  public startInterval = () => {
    const interval = this.state.interval || 0;
    this.intervalId = setInterval(() => {
      if (this.state.interval) {
        this.scan();
      } else {
        clearInterval(this.intervalId);
      }
    }, interval);
  };

  public stopInterval = () => {
    this.setState({ interval: null });
  };

  public scan = () => {
    if (this.webcam) {
      const imageSrc = this.webcam.getScreenshot();
      if (imageSrc) {
        this.qr.decode(imageSrc);
      }
    }
  };

  public close = () => {
    this.stopInterval();
    this.props.onClose();
  };

  public componentWillUnmount() {
    this.stopInterval();
  }

  public render() {
    return (
      <Webcam
        audio={false}
        width={350}
        height={350}
        ref={(c: any) => (this.webcam = c)}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: this.state.mobile ? { exact: "environment" } : "user"
        }}
      />
    );
  }
}

export default QRCodeScanner;
