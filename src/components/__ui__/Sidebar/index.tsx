import styled from 'styled-components'
import React from 'react'
import { FormControlLabel, Checkbox, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const Container = styled.div`
    background: antiquewhite;
    height: 100%;
    width: 250px;
    position: relative;
`

const DropdownContainer = styled.div`
    margin-top: 10px;
    font-size: 12px;
`

const CheckboxContainer = styled.div`
    height: 800px;
    overflow-y: scroll;
    display: block;

    .MuiTypography-body1 {
        font-size: 12px !important;
    }
`

const Title = styled.div`
    font-size: 30px;
    margin : 10px;
`

const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
    },
    formControl: {
      width: '80%',
      'span' : {
        fontSize: '12px'
      }
    }
  }));


interface Props {
    selectedType: string
    types: string[]
    provinces: string[]
    selectedFilters?: string[]
    countries: string[]
    handleChangeType: (type: string) => void
    handleFilter?: (filters: string[]) => void
}

const Sidebar: React.FC<Props> = props => {

    const { types, selectedType, provinces, countries, handleChangeType, handleFilter } = props

    const filters = selectedType === 'World' ? countries : provinces

    const classes = useStyles()

    return <Container>
        <Title>Selectors</Title>

        <DropdownContainer>
            <Select value={selectedType}>
                {types.map((type, index) => <MenuItem key={index} value={type} onChange={(event) => handleChangeType((event.target as any).value)}>{type}</MenuItem>)}
            </Select>
        </DropdownContainer>

        <CheckboxContainer>
            {filters.map(area =>
                <FormControlLabel
                    className={classes.formControl}
                    control={
                        <Checkbox
                            checked={false}
                            onChange={(_) => undefined}
                            name={'test'}
                        />}
                    label={area}
                />
            )}
        </CheckboxContainer>
    </Container>
}

export default Sidebar