import { Alert, Space, Switch, Table } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useMemo, useState } from 'react';
import { getColorFromText } from '../utils/colors';

interface TimeData {
    key: string;
    dateString: string;
    format: string;
    parseResult: string;
    toString: string;
    toISOString: string;
    isValid: string;
}

const dateExamples = [
    // 错误的格式
    {
        dateString: '2024-01-01',  // 格式与内容不匹配
        format: 'DD-MM-YYYY'
    },
    {
        dateString: '13:30:45',  // 缺少日期部分
        format: 'YYYY-MM-DD'
    },
    // 需要额外插件的复杂格式
    {
        dateString: 'Sunday, December 31st 2023',  // 需要localized和ordinal插件
        format: 'dddd, MMMM Do YYYY'
    },
    {
        dateString: '2023/W52/7',  // ISO周格式
        format: 'YYYY/[W]WW/E'
    },
    {
        dateString: '31-Dec-2023',  // 带月份缩写的格式
        format: 'DD-MMM-YYYY'
    },
    // 需要customParseFormat的格式
    {
        dateString: '12/31/2023 2:30 PM',  // 12小时制
        format: 'MM/DD/YYYY h:mm A'
    },
    {
        dateString: '2023年12月31日 下午4点30分',  // 中文时间格式
        format: 'YYYY年MM月DD日 A[点]mm[分]'
    },
    {
        dateString: '12-31-2023',  // 美式日期格式（月在前）
        format: 'MM-DD-YYYY'
    },
    {
        dateString: '2023.12.31',  // 点号分隔的日期
        format: 'YYYY.MM.DD'
    },
    {
        dateString: '31_12_2023',  // 下划线分隔的日期
        format: 'DD_MM_YYYY'
    },
    {
        dateString: '20231231163000',  // 紧凑格式的日期时间
        format: 'YYYYMMDDHHmmss'
    },
    // 默认支持的格式
    {
        dateString: '2023-12-31T16:00:00Z',  // ISO 8601
        format: 'YYYY-MM-DDTHH:mm:ssZ'
    },
    {
        dateString: '2024-01-01',  // 标准日期格式
        format: 'YYYY-MM-DD'
    },
    {
        dateString: '01/01/2024',  // 带斜杠的日期
        format: 'DD/MM/YYYY'
    },
];

const CustomParseFormatDemo: React.FC = () => {
    const [useCustomParseFormat, setUseCustomParseFormat] = useState(false);

    const [version, setVersion] = useState(0);

    useEffect(() => {
        if (useCustomParseFormat) {
            console.log("### dayjs.extend(customParseFormat)")
            dayjs.extend(customParseFormat);
            setTimeout(() => {
                setVersion(version + 1);
            }, 1000);
        }
    }, [useCustomParseFormat]);

    const timeComparisonData = useMemo(() => {
        console.log("### re-render", version);
        return dateExamples.map(({ dateString, format }, index) => {
            const parsedDate = dayjs(dateString, format);
            const isValid = parsedDate.isValid();
            return {
                key: String(index),
                dateString,
                format,
                parseResult: isValid ? parsedDate.format('YYYY-MM-DD HH:mm:ss') : '无效日期',
                toString: isValid ? parsedDate.toString() : '无效日期',
                toISOString: isValid ? parsedDate.toISOString() : '无效日期',
                isValid: isValid ? '是' : '否'
            } as TimeData;
        });
    }, [version]);

    const columns = [
        {
            title: '日期字符串',
            dataIndex: 'dateString',
            key: 'dateString',
        },
        {
            title: '解析格式',
            dataIndex: 'format',
            key: 'format',
        },
        {
            title: '解析结果',
            dataIndex: 'parseResult',
            key: 'parseResult',
            onCell: (record: TimeData) => ({
                style: {
                    backgroundColor: getColorFromText(record.parseResult),
                }
            })
        },
        {
            title: 'toString()',
            dataIndex: 'toString',
            key: 'toString',
            onCell: (record: TimeData) => ({
                style: {
                    backgroundColor: getColorFromText(record.toString),
                }
            })
        },
        {
            title: 'toISOString()',
            dataIndex: 'toISOString',
            key: 'toISOString',
            onCell: (record: TimeData) => ({
                style: {
                    backgroundColor: getColorFromText(record.toISOString),
                }
            })
        },
        {
            title: '是否有效',
            dataIndex: 'isValid',
            key: 'isValid',
            onCell: (record: TimeData) => ({
                style: {
                    backgroundColor: getColorFromText(record.isValid),
                }
            })
        }
    ];

    return (
        <Space direction="vertical">
            <div><Switch checked={useCustomParseFormat} onChange={() => {
                if (!useCustomParseFormat) {
                    setUseCustomParseFormat(true);
                }
            }} />是否使用customParseFormat，开启后无法关闭</div>
            <Alert showIcon message="注意有一些不使用customParseFormat是能解析的，而使用后反而解析不了。说明dayjs本身会猜测" type="info" />
            <Table
                dataSource={timeComparisonData}
                columns={columns}
                pagination={false}
                bordered
            />
        </Space>
    );
};

export default CustomParseFormatDemo; 