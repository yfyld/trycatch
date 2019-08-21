import { BASE_URL } from './../../app.config';
import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';
import * as echarts from 'echarts';

import { Injectable } from '@nestjs/common';
import * as UA from 'ua-device';

@Injectable()
export class ChartService {
  constructor() {}
  public generateImg(config: any): any {
    var ctx = createCanvas(128, 128);
    // if (config.font) {
    //   ctx.font = config.font;
    // }

    echarts.setCanvasCreator(function() {
      return ctx;
    });

    var chart,
      option = {
        title: {
          text: 'test',
        },
        tooltip: {},
        legend: {
          data: ['test'],
        },
        xAxis: {
          data: ['a', 'b', 'c', 'd', 'f', 'g'],
        },
        yAxis: {},
        series: [
          {
            name: 'test',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

    let defaultConfig = {
      width: 500,
      height: 500,
      option,
      enableAutoDispose: true,
      path: path.join(__dirname, '../../publics/charts/default.png'),
    };

    config = Object.assign({}, defaultConfig, config);

    config.option.animation = false;
    chart = echarts.init(
      createCanvas(parseInt(config.width, 10), parseInt(config.height, 10)),
    );
    chart.setOption(config.option);
    if (config.path) {
      try {
        fs.writeFileSync(config.path, chart.getDom().toBuffer());
        if (config.enableAutoDispose) {
          chart.dispose();
        }
        return `${BASE_URL.serverUrl}/public/charts/${config.path.replace(
          /^.*([^/]+\.png)/,
          '$1',
        )}`;
      } catch (err) {
        console.error('Error: Write File failed' + err.message);
      }
    } else {
      var buffer = chart.getDom().toBuffer();
      try {
        if (config.enableAutoDispose) {
          chart.dispose();
        }
      } catch (e) {}
      return buffer;
    }
  }
}
