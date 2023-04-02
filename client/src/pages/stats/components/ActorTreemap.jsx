import React from 'react';

import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

class ActorTreeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [
                {
                    data: props.data
                    //     [ {
                    //         x: 'New Delhi',
                    //         y: 218
                    //     },
                    //     {
                    //         x: 'Kolkata',
                    //         y: 149
                    //     },
                    //     {
                    //         x: 'Mumbai',
                    //         y: 184
                    //     },
                    //     {
                    //         x: 'Ahmedabad',
                    //         y: 55
                    //     },
                    //     {
                    //         x: 'Bangaluru',
                    //         y: 84
                    //     },
                    //     {
                    //         x: 'Pune',
                    //         y: 31
                    //     },
                    //     {
                    //         x: 'Chennai',
                    //         y: 70
                    //     },
                    //     {
                    //         x: 'Jaipur',
                    //         y: 30
                    //     },
                    //     {
                    //         x: 'Surat',
                    //         y: 44
                    //     },
                    //     {
                    //         x: 'Hyderabad',
                    //         y: 68
                    //     },
                    //     {
                    //         x: 'Lucknow',
                    //         y: 28
                    //     },
                    //     {
                    //         x: 'Indore',
                    //         y: 19
                    //     },
                    //     {
                    //         x: 'Kanpur',
                    //         y: 29
                    //     }
                    // ]
                }
            ],
            options: {
                legend: {
                    show: false
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '14px',
                    },
                },

                chart: {
                    width: 800,
                    height: 400,
                    type: 'treemap'
                }
            },


        };
    }



    render() {
        return (


            <div id="chart">
                <ApexCharts options={this.state.options} series={this.state.series} type="treemap" width={800} height={400} />
            </div>
        )
    }
}

export default ActorTreeMap;