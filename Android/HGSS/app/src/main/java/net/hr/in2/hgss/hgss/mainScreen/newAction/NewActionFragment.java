package net.hr.in2.hgss.hgss.mainScreen.newAction;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.google.gson.Gson;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.extra.Utils;
import net.hr.in2.hgss.hgss.mainScreen.MainActivity;
import net.hr.in2.hgss.hgss.model.Action;
import net.hr.in2.hgss.hgss.model.Person;
import net.hr.in2.hgss.hgss.model.Profession;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class NewActionFragment extends Fragment {

    @BindView(R.id.confirm_action_btn)
    Button btnNewAction;

    @BindView(R.id.meet_location_btn)
    Button btnMeetLocation;

    @BindView(R.id.action_title_et)
    EditText actionTitle;

    @BindView(R.id.action_details_et)
    EditText actionDetails;

    @BindView(R.id.people_number_picker)
    EditText peopleNumberPicker;

    @BindView(R.id.check_box_ll)
    LinearLayout checkBoxes;

    private List<Double> coords;

    private ProgressDialog progressDialog;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_new_action, container, false);
        ButterKnife.bind(this, view);

        final Activity activity = getActivity();

        btnMeetLocation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(activity, MapActivity.class);
                startActivityForResult(intent, 999);
            }
        });

        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Nova akcija");

        btnNewAction.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                progressDialog = new ProgressDialog(activity);
                progressDialog.setIndeterminate(true);
                progressDialog.setMessage(getResources().getString(R.string.send_new_action));
                progressDialog.show();

                Action action = fillAction();

                Call<List<Person>> call = Utils.getRestApi().newAction(action);
                call.enqueue(new Callback<List<Person>>() {
                    @Override
                    public void onResponse(Call<List<Person>> call, Response<List<Person>> response) {
                        progressDialog.hide();
                        if (response.body() != null) {

                            List<Person> persons = response.body();
                            Gson gson = new Gson();
                            String personStr = gson.toJson(persons);
                            Intent i = new Intent(activity, PersonsActivity.class);
                            i.putExtra("persons",personStr);
                            activity.startActivity(i);
                        } else {
                            Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<List<Person>> call, Throwable t) {
                        progressDialog.hide();
                        Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
                    }
                });
            }
        });

        return view;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 999 && resultCode == Activity.RESULT_OK){
            coords = new ArrayList<Double>();
            double[] location = data.getDoubleArrayExtra("location");
            for(double value : location){
                coords.add(value);
                btnMeetLocation.setCompoundDrawablesWithIntrinsicBounds( 0, 0, R.drawable.ic_add_location, 0);
            }
        }
    }

    private Action fillAction() {

        List<Profession> professions = new ArrayList<>();

        for (int i = 0; i < checkBoxes.getChildCount(); i++) {
            View v = checkBoxes.getChildAt(i);
            if (v instanceof CheckBox) {
                if(((CheckBox) v).isChecked()){
                    String tmp = ((CheckBox) v).getText().toString();
                    professions.add(Utils.mapStringToEnumProfession(tmp));
                }
            }
        }
        return new Action(new Date(), new Date(), actionTitle.getText().toString(),actionDetails.getText().toString(), new ArrayList<Person>(), professions, Utils.getPerson(), coords, Integer.parseInt(peopleNumberPicker.getText().toString()));
    }
}
