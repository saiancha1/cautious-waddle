import React from 'react';
import PieChart from './PieChart';

class Analytics extends React.Component {
    state = {
      pieData: [],
    }


    componentDidMount() {
      fetch('api/admin/analytics', {
        headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
      }).then(res => res.json())
        .then((json) => {
          const filteredData = this.filterPieData(json);
          console.log(filteredData);

          this.setState({ pieData: filteredData });
        })
        .catch(() => { alert('Error Loading Analytics Data'); });
    }

    filterPieData = (json) => {
      const data = [['1', '2']];
      json.reports[0].data.rows.forEach((row) => {
        let viewCount = parseInt(row.metrics[0].values[0]);
        const rowD = [row.dimensions[0], viewCount];
        data.push(rowD);
      });
      return data;
    }

    render() {
      return (
        <div className="row">
          <div className="col-md-6">
            <PieChart data={this.state.pieData} title ="Views By Page (Last 30 days)"/>
          </div>
        </div>
      );
    }
}
export default Analytics;
