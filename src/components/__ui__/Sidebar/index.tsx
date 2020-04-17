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
    selectedFilters: string[]
    countries: string[]
    handleChangeType: (type: string) => void
    handleFilter: (filters: string[]) => void
}

const Sidebar: React.FC<Props> = props => {

    const { types, selectedType, provinces, countries, handleChangeType, handleFilter, selectedFilters } = props

    const filters = selectedType === 'World' ? countries : provinces
    const sortedFilters = filters.sort()

    const classes = useStyles()

    const handleCheckbox = (event: React.ChangeEvent) => {

        const checked = (event.target as any).checked
        const name = (event.target as any).name
        const filters = [...selectedFilters]
        if (checked) {
            filters.push(name)
        }
        else {
            const index = filters.indexOf(name)
            if (index > -1) {
                filters.splice(index, 1)
            }
        }
        handleFilter(filters)
    }

    return <Container>
        <Title>Selectors</Title>

        <DropdownContainer>
            <Select onChange={(event) => handleChangeType((event.target as any).value)} value={selectedType}>
                {types.map((type, index) => <MenuItem key={index} value={type} >{type}</MenuItem>)}
            </Select>
        </DropdownContainer>

        <CheckboxContainer>
            {sortedFilters.map(area =>
                <FormControlLabel
                    className={classes.formControl}
                    control={
                        <Checkbox
                            checked={selectedFilters.includes(area)}
                            onChange={handleCheckbox}
                            name={area}
                        />}
                    label={area}
                />
            )}
        </CheckboxContainer>
    </Container>
}

export default Sidebar