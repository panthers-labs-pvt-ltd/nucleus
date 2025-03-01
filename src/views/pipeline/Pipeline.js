import React, { useEffect ,useState} from 'react'
import classNames from 'classnames'
import axios from "axios";
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const Dashboard = () => {
  const [pipelineList, setPipelineList] = useState([])
/*
  var pipelineList = [
    {
      "cache_block_output_in_memory": false,
      "concurrency_config": {},
      "created_at": "2025-01-02 06:43:39.376642+00:00",
      "data_integration": null,
      "description": "11",
      "executor_config": {},
      "executor_count": 1,
      "executor_type": null,
      "name": "endearing sorcerer",
      "notification_config": {},
      "remote_variables_dir": null,
      "retry_config": {},
      "run_pipeline_in_one_process": false,
      "settings": {
        "triggers": null
      },
      "tags": [],
      "type": "python",
      "uuid": "endearing_sorcerer",
      "variables_dir": "/root/.mage_data/default_repo",
      "spark_config": {},
      "blocks": [],
      "callbacks": [],
      "conditionals": [],
      "widgets": [],
      "schedules": [
        {
          "created_at": "2025-01-08T16:08:51",
          "id": 1,
          "name": "still druid",
          "pipeline_uuid": "endearing_sorcerer",
          "schedule_interval": null,
          "schedule_type": null,
          "start_time": null,
          "status": "inactive",
          "updated_at": "2025-01-08T16:08:51"
        }
      ],
      "updated_at": "2025-01-02T06:43:39.159555+00:00"
    },
    {
      "cache_block_output_in_memory": false,
      "concurrency_config": {},
      "created_at": null,
      "data_integration": null,
      "description": null,
      "executor_config": {},
      "executor_count": 1,
      "executor_type": null,
      "name": "example_pipeline",
      "notification_config": {},
      "remote_variables_dir": null,
      "retry_config": {},
      "run_pipeline_in_one_process": false,
      "settings": {
        "triggers": null
      },
      "tags": [],
      "type": "python",
      "uuid": "example_pipeline",
      "variables_dir": "/root/.mage_data/default_repo",
      "spark_config": {},
      "blocks": [
        {
          "all_upstream_blocks_executed": true,
          "color": null,
          "configuration": {},
          "downstream_blocks": [
            "fill_in_missing_values"
          ],
          "executor_config": null,
          "executor_type": "local_python",
          "has_callback": null,
          "name": "load_titanic",
          "language": "python",
          "retry_config": null,
          "status": null,
          "timeout": null,
          "type": "data_loader",
          "upstream_blocks": [],
          "uuid": "load_titanic"
        },
        {
          "all_upstream_blocks_executed": false,
          "color": null,
          "configuration": {},
          "downstream_blocks": [
            "export_titanic_clean"
          ],
          "executor_config": null,
          "executor_type": "local_python",
          "has_callback": null,
          "name": "fill_in_missing_values",
          "language": "python",
          "retry_config": null,
          "status": null,
          "timeout": null,
          "type": "transformer",
          "upstream_blocks": [
            "load_titanic"
          ],
          "uuid": "fill_in_missing_values"
        },
        {
          "all_upstream_blocks_executed": false,
          "color": null,
          "configuration": {},
          "downstream_blocks": [],
          "executor_config": null,
          "executor_type": "local_python",
          "has_callback": null,
          "name": "export_titanic_clean",
          "language": "python",
          "retry_config": null,
          "status": null,
          "timeout": null,
          "type": "data_exporter",
          "upstream_blocks": [
            "fill_in_missing_values"
          ],
          "uuid": "export_titanic_clean"
        }
      ],
      "callbacks": [],
      "conditionals": [],
      "widgets": [],
      "schedules": [],
      "updated_at": "2024-12-31T15:43:53+00:00"
    }
  ]

  */

  const Fn_GetPipeLineList = () => {
    axios
      .get(
        `http://localhost:6789/api/pipelines?_limit=30&include_schedules=1&api_key=zkWlN0PkIKSN0C11CfUHUj84OT5XOJ6tDZ6bDRO2`
      )
      .then((response) => {
        const posts = response.data;
        console.log(posts)
        setPipelineList(posts.pipelines)
      });
  }


  useEffect(() => {
    Fn_GetPipeLineList()
  }, [])

 
  const columns = [
    {
      key: 'run_pipeline_in_one_process',
      label: 'Status',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      _props: { scope: 'col' },
    },
    {
      key: 'description',
      label: 'Description',
      _props: { scope: 'col' },
    },
    {
      key: 'type',
      label: 'Type',
      _props: { scope: 'col' },
    },
    {
      key: 'updated_at',
      label: 'Updated at',
      _props: { scope: 'col' },
    },
    
  ]
  

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Pipeline List</CCardHeader>
            <CCardBody>
            <CTable align="middle" columns={columns} items={pipelineList} />
            </CCardBody>
          </CCard>
         
        </CCol>
      </CRow>
      <iframe width={1200} height={800} he src="http://localhost:6789/pipelines" title="W3Schools Free Online Web Tutorials"></iframe>
    </>
  )
}

export default Dashboard


/*

const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]
  <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Country
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Payment Method
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Last login</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              */