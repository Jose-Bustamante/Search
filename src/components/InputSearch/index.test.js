import React from "react";

import { mount } from "enzyme";
import Input from "./index";
import { act } from "react-dom/test-utils";
import { resultsSimple } from "./InputSearch.stories";
import InputSearchResultList from "./InputSearchResultList";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { ResultItem, ResultsWrapper } from "./styles";

const onSelectResult = jest.fn();
const onSearch = jest.fn(() => resultsSimple);

jest.useFakeTimers();

it("renders without crashing", () => {
  act(() => {
    const wrapper = mount(
      <Input
        id="exampleId"
        placeholder="Search"
        label="Organization"
        notFoundMessage="Unable to find organization"
        minChars={3}
        debounceTimeout={500}
        onSearch={onSearch}
        onSelectResult={onSelectResult}
        searchResults={[]}
      />
    );

    wrapper
      .find("input")
      .simulate("change", { target: { value: "My new value" } });
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
  });

  expect(onSearch).toHaveBeenCalled();
});

it("renders results", () => {
  let wrapper;
  act(() => {
    wrapper = mount(
      <Input
        id="exampleId"
        placeholder="Search"
        label="Organization"
        notFoundMessage="Unable to find organization"
        minChars={3}
        debounceTimeout={500}
        onSearch={onSearch}
        onSelectResult={onSelectResult}
        searchResults={[]}
      />
    );
    wrapper.find("input").simulate("change", { target: { value: "tru" } });

    wrapper.setProps({ searchResults: resultsSimple });

    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
  });

  wrapper.update();
  const a = wrapper.find(InputSearchResultList);
  expect(wrapper.find(InputSearchResultList)).toBeDefined();

  expect(onSearch).toHaveBeenCalled();
});

it("it remove results", () => {
  let wrapper;
  act(() => {
    wrapper = mount(
      <Input
        id="exampleId"
        placeholder="Search"
        label="Organization"
        notFoundMessage="Unable to find organization"
        minChars={3}
        debounceTimeout={500}
        onSearch={onSearch}
        onSelectResult={onSelectResult}
        searchResults={[]}
      />
    );
    wrapper.find("input").simulate("change", { target: { value: "tru" } });
    wrapper.update();

    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
  });
  wrapper.update();

  const deleteButton = wrapper.find(CloseIcon);
  expect(deleteButton).toBeDefined();

  expect(wrapper.find("input").props().value).toBe("tru");

  deleteButton.simulate("click");
  wrapper.update();

  expect(wrapper.find("input").props().value).toBe("");

  expect(onSearch).toHaveBeenCalled();
});

it("it should select value from dropdown", () => {
  let wrapper;
  act(() => {
    wrapper = mount(
      <Input
        id="exampleId"
        placeholder="Search"
        label="Organization"
        notFoundMessage="Unable to find organization"
        minChars={3}
        debounceTimeout={500}
        onSearch={onSearch}
        onSelectResult={onSelectResult}
        searchResults={[]}
      />
    );
    wrapper.find("input").simulate("change", { target: { value: "tru" } });
    wrapper.setProps({ searchResults: resultsSimple });

    wrapper.update();

    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
  });

  wrapper.update();

  wrapper.find(ResultItem).at(0).simulate("click");

  expect(wrapper.find("input").props().value).toBe("heren truien");
});
