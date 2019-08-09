function ErrorBoundary(Component: any) {
  class WrapperComponent extends Component {
    constructor() {
      super()
      // this.state = {
      //     // hasError: false
      // }
    }
    componentDidCatch() {
      this.setState({ hasError: true })
    }
    render() {
      return Component
    }
  }
}
