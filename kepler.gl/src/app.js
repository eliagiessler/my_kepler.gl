// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
// Kepler.gl actions
import {addDataToMap} from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
import munichTrips from './data/tracks_munich_2018-09-16 00:00:08-2018-09-21 23:59:58.csv';
import myConfig from './data/my-config.json';

// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

class App extends Component {
    componentDidMount() {
        const data = Processors.processCsvData(munichTrips);
        const dataset_muc = {
            data: data,
            info: {
                // `info` property are optional, adding an `id` associate with this dataset makes it easier
                // to replace it later
                id: 'MUC'
            }
        };
        // addDataToMap action to inject dataset into kepler.gl instance
        this.props.dispatch(addDataToMap({datasets: dataset_muc, config: myConfig}));
    }

      render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
