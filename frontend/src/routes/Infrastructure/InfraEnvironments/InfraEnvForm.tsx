/* Copyright Contributors to the Open Cluster Management project */
import { useCallback, useMemo } from 'react'
import { Card, CardBody, CardTitle, Grid, GridItem, Split, SplitItem, Stack, StackItem } from '@patternfly/react-core'
import { CIM } from 'openshift-assisted-ui-lib'
import { EnvironmentStepFormValues } from 'openshift-assisted-ui-lib/dist/src/cim/components/InfraEnv/InfraEnvFormPage'
import mainIcon from '../../../logos/OnPremiseBannerIcon.svg'

import './InfraEnvForm.css'
import { useRecoilState } from 'recoil'
import { infraEnvironmentsState } from '../../../atoms'

const { InfraEnvFormPage, getLabels } = CIM

type InfraEnvFormProps = {
    control?: any
    handleChange?: any
}

const InfraEnvForm: React.FC<InfraEnvFormProps> = ({ control, handleChange }) => {
    const [infraEnvironments] = useRecoilState(infraEnvironmentsState)
    const onValuesChanged = useCallback((values: EnvironmentStepFormValues) => {
        control.active = values
        if (values.labels) {
            control.active = {
                ...control.active,
                labels: getLabels(values),
            }
        }
        if (values.pullSecret) {
            control.active = {
                ...control.active,
                pullSecret: btoa(values.pullSecret),
            }
        }
        handleChange(control)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const infraEnvNames = useMemo(() => infraEnvironments.map((ie) => ie.metadata.name), [infraEnvironments])
    return (
        <Grid hasGutter className="infra-env-form">
            <GridItem span={8}>
                <InfraEnvFormPage onValuesChanged={onValuesChanged} usedNames={infraEnvNames} />
            </GridItem>
            <GridItem span={8}>
                <Card>
                    <Split hasGutter>
                        <SplitItem>
                            <CardBody style={{ width: '200px' }}>
                                <img src={mainIcon} alt="On Premise Banner Icon" id="onPremiseBannerIconPng" />
                            </CardBody>
                        </SplitItem>
                        <SplitItem isFilled>
                            <CardTitle>Next steps: Adding hosts</CardTitle>
                            <CardBody>
                                <Stack hasGutter>
                                    <StackItem>
                                        Once you've successfully created your infrastructure environment go to the
                                        details view and add hosts to it.
                                    </StackItem>
                                    <StackItem>
                                        This will allow cluster creators to then pull from the infrastructure
                                        environment any available hosts that have been added.
                                    </StackItem>
                                </Stack>
                            </CardBody>
                        </SplitItem>
                    </Split>
                </Card>
            </GridItem>
        </Grid>
    )
}

export default InfraEnvForm
