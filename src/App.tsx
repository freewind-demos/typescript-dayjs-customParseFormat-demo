import { Descriptions, Divider, Flex, Typography } from 'antd';
import CustomParseFormatDemo from './components/CustomParseFormatDemo';

const { Title, Paragraph } = Typography;

function App() {
    return (
        <Flex vertical gap="small">
            <Title level={2}>Day.js customParseFormat 插件</Title>
            <Paragraph>
                customParseFormat插件提供了自定义格式解析日期字符串的功能。
                它允许你使用自定义的格式字符串来解析日期，使日期字符串的解析更加灵活。
            </Paragraph>
            <div>
                <Paragraph>customParseFormat插件的使用方法：</Paragraph>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="基本用法">
                        <Descriptions column={1}>
                            <Descriptions.Item label="dayjs('2023-12-31T16:00:00Z', 'YYYY-MM-DDTHH:mm:ssZ')">解析UTC时间格式字符串</Descriptions.Item>
                            <Descriptions.Item label="dayjs('2024-01-01', 'YYYY-MM-DD')">使用指定格式解析日期字符串</Descriptions.Item>
                            <Descriptions.Item label="dayjs('01/01/2024', 'DD/MM/YYYY')">使用自定义分隔符的格式</Descriptions.Item>
                            <Descriptions.Item label="dayjs('2024年01月01日', 'YYYY年MM月DD日')">使用中文格式</Descriptions.Item>
                            <Descriptions.Item label="dayjs('20240101', 'YYYYMMDD')">解析无分隔符的日期字符串</Descriptions.Item>
                            <Descriptions.Item label="dayjs('2024-01-01 13:30:45', 'YYYY-MM-DD HH:mm:ss')">解析日期时间字符串</Descriptions.Item>
                            <Descriptions.Item label="dayjs('01-01-2024 13:30', 'DD-MM-YYYY HH:mm')">自定义日期时间格式</Descriptions.Item>
                        </Descriptions>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <Divider />
            <CustomParseFormatDemo />
        </Flex>
    );
}

export default App; 