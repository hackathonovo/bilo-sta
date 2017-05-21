package net.hr.in2.hgss.hgss.mainScreen.newAction;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.model.Person;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PersonsActivity extends AppCompatActivity {

    List<Person> persons;

    @BindView(R.id.rv_persons)
    RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_persons);
        ButterKnife.bind(this);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        String personsStr = null;
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            personsStr = extras.getString("persons");
        }

        Gson gson = new Gson();
        persons = gson.fromJson(personsStr, new TypeToken<List<Person>>(){}.getType());

        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(new MyPersonsRecyclerViewAdapter(persons));
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                //Write your logic here
                this.finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
