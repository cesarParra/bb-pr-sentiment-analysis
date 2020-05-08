import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { DocumentTone } from "../service/tone/tone-client";

interface Serie {
  name: string;
  data: number[];
}

interface Option {
  chart: Chart;
  title?: Title;
  xaxis: Xaxis;
}

interface Chart {
  height: number;
  type: string;
  toolbar: { show: boolean };
}

interface Title {
  text: string;
}

interface Xaxis {
  categories: string[];
}

interface MeshState {
  series: Serie[];
  options: Option;
}

interface MeshProps {
  documentTone: DocumentTone;
  listenForUpdates?: boolean;
}

export default class Mesh extends Component<MeshProps, MeshState> {
  constructor(props: MeshProps) {
    super(props);

    let seriesData = [];
    seriesData.push(this.getToneValue(props.documentTone, "Anger"));
    seriesData.push(this.getToneValue(props.documentTone, "Fear"));
    seriesData.push(this.getToneValue(props.documentTone, "Joy"));
    seriesData.push(this.getToneValue(props.documentTone, "Sadness"));
    seriesData.push(this.getToneValue(props.documentTone, "Analytical"));
    seriesData.push(this.getToneValue(props.documentTone, "Confident"));
    seriesData.push(this.getToneValue(props.documentTone, "Tentative"));

    this.state = {
      series: [
        {
          name: "Tone",
          data: seriesData,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "radar",
          toolbar: { show: false },
        },
        xaxis: {
          categories: [
            "Anger",
            "Fear",
            "Joy",
            "Sadness",
            "Analytical",
            "Confident",
            "Tentative",
          ],
        },
      },
    };
  }

  componentDidUpdate(prevProps: MeshProps) {
    if (!this.props.listenForUpdates) {
      return;
    }

    if (
      this.getToneValue(this.props.documentTone, "Anger") !==
        this.getToneValue(prevProps.documentTone, "Anger") ||
      this.getToneValue(this.props.documentTone, "Fear") !==
        this.getToneValue(prevProps.documentTone, "Fear") ||
      this.getToneValue(this.props.documentTone, "Joy") !==
        this.getToneValue(prevProps.documentTone, "Joy") ||
      this.getToneValue(this.props.documentTone, "Sadness") !==
        this.getToneValue(prevProps.documentTone, "Sadness") ||
      this.getToneValue(this.props.documentTone, "Analytical") !==
        this.getToneValue(prevProps.documentTone, "Analytical") ||
      this.getToneValue(this.props.documentTone, "Confident") !==
        this.getToneValue(prevProps.documentTone, "Confident") ||
      this.getToneValue(this.props.documentTone, "Tentative") !==
        this.getToneValue(prevProps.documentTone, "Tentative")
    ) {
      let seriesData = [];
      seriesData.push(this.getToneValue(this.props.documentTone, "Anger"));
      seriesData.push(this.getToneValue(this.props.documentTone, "Fear"));
      seriesData.push(this.getToneValue(this.props.documentTone, "Joy"));
      seriesData.push(this.getToneValue(this.props.documentTone, "Sadness"));
      seriesData.push(this.getToneValue(this.props.documentTone, "Analytical"));
      seriesData.push(this.getToneValue(this.props.documentTone, "Confident"));
      seriesData.push(this.getToneValue(this.props.documentTone, "Tentative"));

      this.setState({
        series: [{ name: "Tone", data: seriesData }],
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radar"
          height={250}
        />
      </div>
    );
  }

  getToneValue(documentTone: DocumentTone, toneName: string): number {
    const found = documentTone.tones.find(
      (currentTone) => currentTone.tone_name === toneName
    );
    if (found) {
      return parseFloat((found.score * 100).toFixed(2));
    }

    return 0;
  }
}
