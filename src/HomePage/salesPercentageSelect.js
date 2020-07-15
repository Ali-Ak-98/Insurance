import React, {Component} from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const CancelToken = axios.CancelToken;
let cancel;

export default class SalesPercentageSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getOptions = this.getOptions.bind(this);
        var options = [];
        axios.get('https://jsonplaceholder.typicode.com/albums').then((response) => {
            response.data.forEach(function (e) {
                options.push({'value': e.id, 'label': e.title});
            });
            var url_string = window.location.href;
            var url = new URL(url_string);
            var selectedOption = null;

            this.setState({
                selectedOption: (this.props.id) ? options[this.props.id] : null,
                defaultOption: options
            })

        });
    }

    handleChange(selectedOption) {
        this.setState({
            selectedOption: selectedOption
        });
        this.props.func(selectedOption);
    };

    mapOptionsToValues(options) {
        return options.map(option => ({
            value: option.id,
            label: option.title
        }));
    };

    getOptions(inputValue, callback) {
        if (!inputValue) {
            return callback([]);
        }

        cancel && cancel();

        axios.get('https://jsonplaceholder.typicode.com/albums', {
            params: {
                term: inputValue
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            })
        }).then((response) => {
            const results = response.data;
            if (this.props.mapOptionsToValues)
                callback(this.props.mapOptionsToValues(results));
            else callback(this.mapOptionsToValues(results));
        });
    };


    render() {
        return (
            <AsyncSelect
                onChange={this.handleChange.bind(this)}
                placeholder={'انتخاب نوع خودرو'}
                loadOptions={this.getOptions}
                value={this.state.selectedOption}
                defaultOptions={this.state.defaultOption}
                classNamePrefix={'react-select'}
                name={'carType'}
                styles={{
                    option: base => ({
                        ...base,
                        textAlign:'right',
                    }),
                }}
            />
        )
    }
}
