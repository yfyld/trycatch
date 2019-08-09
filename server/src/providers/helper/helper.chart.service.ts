import * as fs from 'fs';
import * as path from 'path';

import * as Canvas from 'canvas-prebuilt';
import * as echarts from 'echarts';

function generateChart(config) {
  const ctx = new Canvas(128, 128);
  if (config.font) {
    ctx.font = config.font;
  }

  echarts.setCanvasCreator(function() {
    return ctx;
  });

  let chart,
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

  const defaultConfig = {
    width: 500,
    height: 500,
    option,
    enableAutoDispose: true,
  };

  config = Object.assign({}, defaultConfig, config);

  config.option.animation = false;
  chart = echarts.init(
    new Canvas(parseInt(config.width, 10), parseInt(config.height, 10)),
  );
  chart.setOption(config.option);
  if (config.path) {
    try {
      fs.writeFileSync(config.path, chart.getDom().toBuffer());
      if (config.enableAutoDispose) {
        chart.dispose();
      }
      console.log('Create Img:' + config.path);
    } catch (err) {
      console.error('Error: Write File failed' + err.message);
    }
  } else {
    const buffer = chart.getDom().toBuffer();
    try {
      if (config.enableAutoDispose) {
        chart.dispose();
      }
    } catch (e) {}
    return buffer;
  }
}
