import * as React from "react";
import * as Webcam from "react-webcam";
import QrCode from "qrcode-reader";

interface IQRCodeScannerState {
  interval: number | null;
}

interface IQRCodeScannerProps {
  onScan: any;
  onValidate: any;
  onClose: any;
}

class QRCodeScanner extends React.Component<IQRCodeScannerProps> {
  public state: IQRCodeScannerState;
  public webcam: Webcam | null;
  public intervalId: any;
  public qr: any;

  constructor(props: IQRCodeScannerProps) {
    super(props);
    this.state = {
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
        height={350}
        ref={c => (this.webcam = c)}
        screenshotFormat="image/jpeg"
        width={350}
      />
    );
  }
}

export default QRCodeScanner;
