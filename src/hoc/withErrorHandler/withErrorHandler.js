import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const withErrorHandler = (WrappedContent, axios) => {
    return class extends Component {
        constructor(props){
            super(props);
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(resp => resp, error => {
                this.setState({error: error});
            })
        }
        state = { 
            error: null
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedContent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;