import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import {
  hotelSelector,
  updateHotelBrand,
  updateHotelDistance,
  updateHotelLocation,
  updateHotelName,
  fetchDistance,
  fetchBrands,
} from "../store/slices/hotelSlice";
import { useDispatch } from "react-redux";
const { Option } = Select;
const { Content } = Layout;

function Home() {
  const [form] = Form.useForm();
  const {
    hotelName,
    hotelLocation,
    hotelDistance,
    hotelBrand,
    distanceList,
    brandList,
  } = useSelector(hotelSelector);
  const dispatch = useDispatch();
  console.log(hotelName, hotelLocation, hotelDistance, hotelBrand);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  useEffect(() => {
    dispatch(fetchDistance());
    dispatch(fetchBrands());
  }, []);
  return (
    <>
      <div>
        {hotelName}-- {hotelLocation} --{hotelDistance}--{hotelBrand}
      </div>
      <Layout>
        <Content>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="hotelname"
              rules={[
                {
                  required: true,
                  message: "Please input your hotel name!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter hotel name"
                value={hotelName}
                onChange={(e) => {
                  dispatch(updateHotelName(e.target.value));
                }}
              />
            </Form.Item>
            <Form.Item
              name="hotellocation"
              rules={[
                {
                  required: true,
                  message: "Please input your hotel location!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter hotel location"
                value={hotelLocation}
                onChange={(e) => {
                  dispatch(updateHotelLocation(e.target.value));
                }}
              />
            </Form.Item>
            <Form.Item
              name="hoteldistance"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a distance range"
                onChange={(value) => {
                  dispatch(updateHotelDistance(value));
                }}
                allowClear
              >
                {distanceList.length &&
                  distanceList.map((d) => (
                    <Option value={d} key={d}>
                      {d}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="hotelbrand"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a brand from the list"
                onChange={(value) => {
                  dispatch(updateHotelBrand(value));
                }}
                allowClear
              >
                {brandList.length &&
                  brandList.map((d) => (
                    <Option value={d} key={d}>
                      {d}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </>
  );
}

export default Home;
