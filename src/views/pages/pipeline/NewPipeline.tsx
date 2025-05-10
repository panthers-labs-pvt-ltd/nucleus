import React from 'react'
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import ExtractTabContent from '../../pipeline/ExtractTabContent'
import TransformTabContent from '../../pipeline/TransformTabContent'
import PersistTabContent from '../../pipeline/PersistTabContent'

const NewPipeline = () => {
  return (
    <CTabs activeItemKey="extract">
      <CTabList variant="tabs">
        <CTab itemKey="extract">Extract</CTab>
        <CTab itemKey="transform">Transform</CTab>
        <CTab itemKey="persist">Persist</CTab>

      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="extract">
          <ExtractTabContent />
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="transform">
          <TransformTabContent />
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="persist">
          <PersistTabContent />
        </CTabPanel>
      </CTabContent>
    </CTabs>
  )
}
export default NewPipeline
