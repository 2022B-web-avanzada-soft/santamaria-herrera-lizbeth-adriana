//g_kosta
import {App, BlockTitle, List, ListItem, Navbar, Page} from "konsta/react";

export default function () {
    return (<>
        <App theme={"ios"}>
            <Page>
                <Navbar
                    title="List"
                />
                <BlockTitle>Links, Header, Footer</BlockTitle>
                <List strongIos outlineIos>
                    <ListItem
                        link
                        header="Name"
                        title="John Doe"
                        after="Edit"
                    />
                </List>

                <BlockTitle>Links, no icons</BlockTitle>
                <List strongIos outlineIos>
                    <ListItem link title="Ivan Petrov"/>
                    <ListItem link title="John Doe"/>
                    <ListItem groupTitle title="Group title here"/>
                    <ListItem link title="Ivan Petrov"/>
                    <ListItem link title="Jenna Smith"/>
                </List>

            </Page>
        </App>
    </>)
}