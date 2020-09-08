import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

export default function SearchBar(props) {
    const { handleChangeSearch, search } = props

    return (
        <Form >
            <InputGroup className="mb-3">
                <FormControl
                    onChange={handleChangeSearch}
                    placeholder="Search pokemon"
                    value={search}
                />
            </InputGroup>
        </Form>
    )
}