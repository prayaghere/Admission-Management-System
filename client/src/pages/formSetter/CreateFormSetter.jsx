import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { IoIosCloseCircleOutline, IoMdTrash } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Input, Space, Table, Spin } from "antd";
import Highlighter from "react-highlight-words";
import { getFormSetters } from "@/services/headAdmin";
import { useToast } from "@/components/ui/use-toast";
import {
  ERROR_DELETE_USER,
  SUCCESS_DELETE_USER,
} from "@/lib/constants/constant";
import { deleteFormSetter } from "@/services/formSetter";
import AddformSetter from "./AddFormSetter";

const CreateFormSetter = () => {
  const [formData, setFormData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddEmployeeWindow, setShowAddEmployeeWindow] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorting: {
      field: "email",
      order: "ascend",
    },
    filters: {},
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    setFetchingData(true); // Set fetching data to true before fetching
    setLoading(true);
    const { pagination, sorting, filters } = tableParams;
    const params = {
      ...pagination,
      ...sorting,
      ...filters,
    };
    getFormSetters(params)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...pagination,
            total: response.totalCount || response.length, // Adjust this based on the response format
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
        setLoading(false);
      })
      .finally(() => {
        setFetchingData(false); // Set fetching data to false after fetching
      });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const updatedTableParams = {
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      sorting: {
        field: sorter.field || "email",
        order: sorter.order || "ascend",
      },
      filters,
    };
    setTableParams(updatedTableParams);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleAddUserClick = () => {
    setShowAddEmployeeWindow(true);
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteFormSetter(deletingId);
      setFormData(formData.filter((item) => item._id !== deletingId));
      setShowDeleteConfirmation(false);
      toast({
        title: SUCCESS_DELETE_USER,
      });
    } catch (error) {
      console.error("Error deleting form setter:", error);
      setShowDeleteConfirmation(false);
      toast({
        title: ERROR_DELETE_USER,
        status: "error",
      });
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "index",
      render: (text, record, index) => <div className="ml-3">{index + 1}</div>,
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      sorter: (a, b) =>
        a.firstname.localeCompare(b.firstname, "en", { sensitivity: "base" }),
      ...getColumnSearchProps("firstname"), // Add search functionality to this column
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      sorter: (a, b) =>
        a.lastname.localeCompare(b.lastname, "en", { sensitivity: "base" }),
      ...getColumnSearchProps("lastname"), // Add search functionality to this column
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) =>
        a.email.localeCompare(b.email, "en", { sensitivity: "base" }),
      ...getColumnSearchProps("email"), // Add search functionality to this column
    },
    {
      title: "Role",
      dataIndex: "role",
    },

    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <Button
            className="bg-transparent text-black border-none shadow-none hover:text-white"
            onClick={() => handleDeleteClick(record._id)}
          >
            <IoMdTrash />
          </Button>
          {showDeleteConfirmation && deletingId === record._id && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
              <div className="relative bg-white p-8 rounded-lg shadow-lg sm:w-1/3">
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p className="mb-6">
                  Are you sure you want to delete this Form Setter?
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => setShowDeleteConfirmation(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primaryText text-white border-none focus:outline-none"
                    onClick={handleConfirmDelete}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  const modifiedData = formData.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  return (
    <div>
      <div className="flex-1 p-4 md:p-8 pt-6 mt-5 sm:ml-48 justify-center items-center overflow-y-auto max-h-screen">
        <div>
          <div className="flex justify-between items-center mb-4 mt-10">
            <h1 className="text-3xl font-bold text-primaryText">
              Form Setters
            </h1>
            <Button
              variant="outline"
              onClick={handleAddUserClick}
              className="bg-primaryText text-white border-none focus:outline-none flex right-5"
            >
              <span>
                <FaPlusCircle />
              </span>
              <span className="sm:ml-2"></span> Add FormSetter
            </Button>
          </div>
          <Separator className="mb-5" />

          {fetchingData ? (
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              className="w-full border border-gray-300 overflow-x-auto mb-10"
              columns={columns}
              dataSource={modifiedData}
              rowKey={(record) => record._id}
              loading={loading}
              onChange={handleTableChange}
            />
          )}

          {showAddEmployeeWindow && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
              <div className="relative bg-white p-8 rounded-lg shadow-lg sm:w-1/3">
                <AddformSetter
                  onSave={(updatedFormsetterData) => {
                    console.log(
                      "Updated formsetter data:",
                      updatedFormsetterData
                    );
                    setShowAddEmployeeWindow(false);
                    fetchData();
                  }}
                />
                <Button
                  className="absolute top-0 right-0 text-red-500 shadow-none border-none bg-transparent"
                  onClick={() => setShowAddEmployeeWindow(false)}
                >
                  <IoIosCloseCircleOutline />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateFormSetter;
